# 專案說明
因為平時在想要怎麼抓買菜的份量和成本</br>
而且又想要寫看看node.js</br>
所以就用 google sheet 結合 Express 來寫看看</br>
第一次接觸 Express，發現不難</br>
上手三天後產生第一版作品</br>
可以直接異動 google sheet 裡面的資料產生不同的結果</br>


# 安裝步驟
nginx
```
    location /express_node{
                alias /var/www/express_node;
                proxy_pass http://localhost:3000;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-NginX-Proxy true;
                proxy_ssl_session_reuse off;
                proxy_set_header Host $http_host;
                proxy_cache_bypass $http_upgrade;
        }

```

## 安裝
```
npm install
```

## prod
```
pm2 start ./bin/www localhost 3000
```

## dev
```
npm run dev
```



# 改裝在 Google Cloud Run 的筆記
```
gcloud run deploy --source .
gcloud config set run/region asia-east1

```

