const githubMirror = "https://hub.gitmirror.com/"
const baseConfig = {
  'mode': 'rule',
  'unified-delay': true,
  'tcp-concurrent': true,
  'external-controller': '127.0.0.1:9090',
  'external-ui': 'clash-ui',
  'external-ui-url': 'https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip',
  'secret': '',
  'use-hosts': true,
  'use-system-hosts': true,
  'find-process-mode': 'strict',
  'geodata-mode': true,
  'geo-update-interval': 12,
  'geo-auto-update': true,
  'geox-url': {
      geoip: `${githubMirror}https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip.dat`,
      geosite: `${githubMirror}https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat`,
      mmdb: `${githubMirror}https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country.mmdb`,
      asn: `${githubMirror}https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/GeoLite2-ASN.mmdb`
  },
  'profile': {
      'store-selected': true,
      'store-fake-ip': true
  },
  'hosts': {
    'time.facebook.com': '17.253.84.125',
    'time.android.com': '17.253.84.125',
  },
}

// 国内DNS服务器
const chinaDNS = [
  "https://223.5.5.5/dns-query", // 阿里DoH
  "tls://223.6.6.6:853",
  "https://1.12.12.12/dns-query", // 腾讯DoH
  "tls://120.53.53.53:853",
];
// 国外DNS服务器
const foreignDNS = [
  "https://8.8.8.8/dns-query#DNS", // GoogleDNS
  "tls://8.8.4.4:853#DNS",
  "https://1.1.1.1/dns-query#DNS", // CloudflareDNS
  "tls://1.0.0.1:853#DNS",
];
// DNS配置
const dnsConfig = {
  "enable": true,
  "listen": ":53",
  "ipv6": false,
  "prefer-h3": true,
  "respect-rules": true,
  "use-system-hosts": true,
  "cache-algorithm": "arc",
  // 有fake-ip和redir-host两种模式
  "enhanced-mode": "redir-host",
  // fake-ip模式专属配置
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter-mode": "blacklist",
  "fake-ip-filter": [
    "www.gstatic.com",
    // 本地主机/设备
    "+.lan",
    "+.local",
    // // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
      // 追加以下条目
    "+.in-addr.arpa",
    "+.ip6.arpa",
    "time.*.com",
    "time.*.gov",
    "pool.ntp.org",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com",
    "rule-set:WorkingNet",
    "geosite:connectivity-check",
    "geosite:private",
    "geosite:geolocation-!cn@cn",
    "geosite:cn",
  ],
  //
  // 代理节点是域名时，使用proxy-server-nameserver解析
  // proxy-server-nameserver为国内域名，避免无法解析
  "proxy-server-nameserver": [...chinaDNS],
  // DNS服务是域名时，使用default-nameserver解析
  "default-nameserver": ["119.29.29.29", "223.5.5.5"],//可修改成自己ISP的DNS
  // Rule规则的命中"直连"的域名，使用direct-nameserver解析
  "direct-nameserver": [...chinaDNS],
  // nameserver-policy没有命中时，走nameserver
  "nameserver": [...foreignDNS],
  "nameserver-policy": {
    "rule-set:WorkingNet": "system",
    "geosite:private": [...chinaDNS],
    "geosite:geolocation-!cn@cn": [...chinaDNS],
    "geosite:geolocation-cn@!cn": [...foreignDNS],
    "geosite:cn": [...chinaDNS],
  },
};

// sni嗅探
// 配合redir-host模式使用
// fake-ip模式需要关闭
const sniffConfig = {
  'enable': true,
  'force-dns-mapping': true,
  'parse-pure-ip': true,
  'override-destination': false,
  'sniff': {
    'TLS': {
      'ports': [443, 8443],
    },
    'HTTP': {
      'ports': [80, "8080-8880"],
    },
    'QUIC': {
      'ports': [443, 8443],
    },
  },
  'force-domain': [],
  'skip-domain': ["Mijia Cloud", "+.oray.com"],
};

// tun模式
const tunConfig = {
  'enable': true,
  'stack': 'mixed',
  'dns-hijack': [
    'any:53',
    'tcp://any:53',
  ],
  'auto-route': true,
  'auto-detect-interface': true,
};

// 代理组通用配置
const groupBaseOption = {
  "interval": 300,
  "tolerance": 300,
  "timeout": 2000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 2,
  "hidden": false,
};
// 代理组筛选条件
const defaultExcludeFilter = "套餐|官网|导航|重置|剩余|客服"
const filterHK = "港|hk|hongkong|hong kong"
const filterTW = "台|tw|taiwan"
const filterJP = "日本|jp|japan"
const filterSG = "新|sg|singapore"
const filterKR = "韩国|kr|korea"
const filterUS = "美|us|unitedstates|united states"
const proxyGroups=[
  {
    ...groupBaseOption,
    "name": "代理",
    "type": "select",
    "include-all": false,
    "proxies": ["美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Auto.png",
  },
  {
    ...groupBaseOption,
    "name": "直连",
    "type": "select",
    "hidden": true,
    "proxies": ["DIRECT"],
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
  },
  {
    ...groupBaseOption,
    "name": "拦截",
    "type": "select",
    "hidden": true,
    "proxies": ["REJECT"],
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
  },  
  {
    ...groupBaseOption,
    "name": "DNS",
    "type": "select",
    "proxies": ["代理", "直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": false,
    "icon": "https://raw.githubusercontent.com/liangjunheng/VPN_RULE/master/icon/DNS.png"
  },
  {
    ...groupBaseOption,
    "name": "中国服务",
    "type": "select",
    "proxies": ["直连", "代理", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": false,
    "icon": "https://raw.githubusercontent.com/Orz-3/mini/master/Color/CN.png"
  },
  {
    ...groupBaseOption,
    "name": "国际服务",
    "type": "select",
    "proxies": ["代理", "直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": false,
    "icon": "https://raw.githubusercontent.com/Orz-3/mini/master/Color/UN.png"
  },
  {
    ...groupBaseOption,
    "name": "谷歌服务",
    "type": "select",
    "proxies": ["代理", "直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": false,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
  },
  {
    ...groupBaseOption,
    "name": "YouTube",
    "type": "select",
    "proxies": ["代理", "直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": false,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
  },
  {
    ...groupBaseOption,
    "name": "Tiktok",
    "type": "select",
    "proxies": ["代理", "直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": false,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/tiktok.svg"
  },
  {
    ...groupBaseOption,
    "name": "Netflix",
    "type": "select",
    "proxies": ["代理", "直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": false,
    "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/netflix.svg"
  },
  {
    ...groupBaseOption,
    "name": "电报消息",
    "type": "select",
    "proxies": ["代理", "直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": false,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
  },
  {
    ...groupBaseOption,
    "name": "ChatGPT",
    "type": "select",
    "include-all": false,
    "proxies": ["代理", "直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
  },
  {
    ...groupBaseOption,
    "name": "微软服务",
    "type": "select",
    "proxies": ["代理", "直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": false,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
  },
  {
    ...groupBaseOption,
    "name": "苹果服务",
    "type": "select",
    "proxies": ["代理", "直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": false,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
  },
  {
    ...groupBaseOption,
    "name": "Jetbrains服务",
    "type": "select",
    "proxies": ["代理", "直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": false,
    "icon": "https://raw.githubusercontent.com/liangjunheng/VPN_RULE/master/icon/JetBrains.png"
  },
  {
    ...groupBaseOption,
    "name": "Spotify",
    "type": "select",
    "proxies": ["代理", "直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": false,
    "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/spotify.svg"
  },
  {
    ...groupBaseOption,
    "name": "漏网之鱼",
    "type": "select",
    "proxies": ["代理", "直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": false,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
  },
  { ...groupBaseOption, "name": "美国节点", "type": "url-test", "include-all-proxies": true, "filter": `(?i)(${filterUS})`, "exclude-filter": defaultExcludeFilter, "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_States.png" },
  { ...groupBaseOption, "name": "香港节点", "type": "url-test", "include-all-proxies": true, "filter": `(?i)(${filterHK})`, "exclude-filter": defaultExcludeFilter, "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hong_Kong.png" },
  { ...groupBaseOption, "name": "新加坡节点", "type": "url-test", "include-all-proxies": true, "filter": `(?i)(${filterSG})`, "exclude-filter": defaultExcludeFilter, "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Singapore.png" },
  { ...groupBaseOption, "name": "台湾节点", "type": "url-test", "include-all-proxies": true, "filter": `(?i)(${filterTW})`, "exclude-filter": defaultExcludeFilter, "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Taiwan.png" },
  { ...groupBaseOption, "name": "日本节点", "type": "url-test", "include-all-proxies": true, "filter": `(?i)(${filterJP})`, "exclude-filter": defaultExcludeFilter, "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Japan.png" },
  { ...groupBaseOption, "name": "韩国节点", "type": "url-test", "include-all-proxies": true, "filter": `(?i)(${filterKR})`, "exclude-filter": defaultExcludeFilter, "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Korea.png" },
  { ...groupBaseOption, "name": "其它地区节点", "type": "select", "include-all-proxies": true, "exclude-filter": `(?i)(${filterHK}|${filterJP}|${filterTW}|${filterSG}|${filterUS}|${filterKR}|${defaultExcludeFilter})`, "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png" },
];

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 43200
};
// 规则集配置
const ruleProviders = {
  "WorkingNet": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/liangjunheng/VPN_RULE/refs/heads/master/clash/rule/WorkingNet",
    "path": "./ruleset/WorkingNet.yaml"
  },
  "icloud": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    "path": "./ruleset/icloud.yaml"
  },
  "apple": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    "path": "./ruleset/apple.yaml"
  },
  "microsoft": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/LM-Firefly/Rules/refs/heads/master/Clash-RuleSet-Classical/Microsoft.yaml",
    "path": "./ruleset/Microsoft.yaml"
  },
  "google": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/LM-Firefly/Rules/refs/heads/master/Clash-RuleSet-Classical/PROXY/Google.yaml",
    "path": "./ruleset/google.yaml"
  },
  "tiktok": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/LM-Firefly/Rules/refs/heads/master/Clash-RuleSet-Classical/Global-Services/TikTok.yaml",
    "path": "./ruleset/tiktok.yaml"
  },
  "JetbrainsDomain": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/LM-Firefly/Rules/master/Clash-RuleSet-Classical/PROXY/Jetbrains.yaml",
    "path": "./ruleset/jetbrainsDomain.yaml"
  },
  "proxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./ruleset/proxy.yaml"
  },
  "ChinaDomain": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/LM-Firefly/Rules/master/Clash-RuleSet-Classical/Domestic.yaml",
    "path": "./ruleset/ChinaDomain.yaml"
  },
  "private": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./ruleset/private.yaml"
  },
  "gfw": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./ruleset/gfw.yaml"
  },
  "tld-not-cn": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./ruleset/tld-not-cn.yaml"
  },
  "telegram": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://raw.githubusercontent.com/LM-Firefly/Rules/refs/heads/master/Clash-RuleSet-Classical/PROXY/Telegram.yaml",
    "path": "./ruleset/telegram.yaml"
  },
  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./ruleset/cncidr.yaml"
  },
  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./ruleset/lancidr.yaml"
  },
  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    "path": "./ruleset/applications.yaml"
  },
  "bahamut": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/Bahamut.txt",
    "path": "./ruleset/bahamut.yaml"
  },
  "YouTube": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/YouTube.txt",
    "path": "./ruleset/YouTube.yaml"
  },
  "Netflix": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/Netflix.txt",
    "path": "./ruleset/Netflix.yaml"
  },
  "Spotify": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/Spotify.txt",
    "path": "./ruleset/Spotify.yaml"
  },
};

// 规则
const rules = [
  // 自定义规则
  "DOMAIN-KEYWORD,porn,拦截",
  "DOMAIN-SUFFIX,github.io,微软服务", // Github Pages
  "DOMAIN,v2rayse.com,国际服务", // V2rayse节点工具
  // RULE-SET 规则集
  "RULE-SET,lancidr,直连,no-resolve",
  "RULE-SET,WorkingNet,直连",
  "RULE-SET,google,谷歌服务",
  "RULE-SET,microsoft,微软服务",
  "RULE-SET,icloud,苹果服务",
  "RULE-SET,apple,苹果服务",
  "RULE-SET,JetbrainsDomain,Jetbrains服务",
  "RULE-SET,telegram,电报消息",
  "RULE-SET,YouTube,YouTube",
  "RULE-SET,tiktok,Tiktok",
  "RULE-SET,Netflix,Netflix",
  "RULE-SET,Spotify,Spotify",
  "RULE-SET,ChinaDomain,中国服务",
  "RULE-SET,applications,中国服务",
  "RULE-SET,private,中国服务",
  "RULE-SET,cncidr,中国服务,no-resolve",
  "RULE-SET,proxy,国际服务",
  "RULE-SET,gfw,国际服务",
  "RULE-SET,tld-not-cn,国际服务",
  // GEO规则,
  "GEOIP,LAN,直连,no-resolve",
  "GEOSITE,geolocation-!cn@cn,中国服务",
  "GEOSITE,geolocation-!cn,国际服务",
  "GEOSITE,geolocation-cn@!cn,国际服务",
  "GEOSITE,cn,中国服务",
  "GEOIP,CN,中国服务,no-resolve",
  // 兜底
  "MATCH,漏网之鱼",
];

// 程序入口
function main(config) {
  // 替换基本设置
  config = {
      ...config,
      ...baseConfig
  }

  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖原配置中DNS配置
  config["dns"] = dnsConfig;
  config["tun"] = tunConfig;
  config["sniffer"] = sniffConfig;
  // 覆盖原配置中的代理组
  config["proxy-groups"] = proxyGroups;
  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;
  config["proxies"].forEach(proxy => {
    // 为每个节点设置 udp = true
    proxy.udp = true
  })

  // 返回修改后的配置
  return config;
}
