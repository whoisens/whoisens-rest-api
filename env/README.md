# Environment setup


### First run

```bash
docker run -dit -p 127.0.0.3:80:80 -p 127.0.0.3:443:443 --name whoisens-api whoisens-api
```


**/etc/rc.local**

```bash
sysctl -w net.ipv4.conf.all.route_localnet=1

# api
EXTERNAL_IP_API=xxx.xxx.xxx.xxx
iptables -t nat -I PREROUTING -d ${EXTERNAL_IP_API} -p tcp --dport 80 -j DNAT --to 127.0.0.3:80
iptables -t nat -I PREROUTING -d ${EXTERNAL_IP_API} -p tcp --dport 443 -j DNAT --to 127.0.0.3:443

su alex -c 'docker start whoisens-api'
```
