# express_node
nginx
```
    location /express_node{
                alias /var/www/express_node;
                proxy_pass       http://localhost:3000;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-NginX-Proxy true;
                proxy_ssl_session_reuse off;
                proxy_set_header Host $http_host;
                proxy_cache_bypass $http_upgrade;
        }

```

#安裝
```
npm install
```

#prod
```
npm runstart
```

#dev
```
npm run dev
```
