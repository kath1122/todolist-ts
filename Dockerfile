#從 node:lts-alpine 這個docker官方image, 並把這個步驟命名為build-stage
FROM node:lts-alpine as build-stage

#設定工作目錄/app
WORKDIR /app

#拷貝專案的 package.json 到目標的 ./ 資料夾
COPY package.json ./

#執行 npm install
RUN npm install

#拷貝 全部結果到目標
COPY . .

#執行 npm run build
RUN npm run build


#從 nginx:stable-alpine 這個docker官方image, 並把這個步驟命名為production-stage
FROM nginx:stable-alpine as production-stage

#拷貝 從build-stage這個步驟的 /app/dist 裡面的檔案 到 nginx的 /usr/share/nginx/html 資料夾下 （也就是我們vue3開發後的打包檔案)
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

#把80 Port對外開放
EXPOSE 80

#啟動nginx
CMD ["nginx", "-g", "daemon off;"]
