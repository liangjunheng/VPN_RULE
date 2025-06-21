const githubMirror = "https://hub.gitmirror.com/"
const baseConfig = {
    'unified-delay': true,
    'tcp-concurrent': true,
    'external-controller': 9090,
    'secret': '******',
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
    profile: {
        'store-selected': true,
        'store-fake-ip': true
    }
}

// 国内DNS服务器
const domesticNameservers = [
  "https://223.5.5.5/dns-query", // 阿里DoH
  "https://1.12.12.12/dns-query", // 腾讯DoH
];
// 国外DNS服务器
const foreignNameservers = [
  "https://8.8.8.8/dns-query", // GoogleDNS
  "https://1.1.1.1/dns-query", // CloudflareDNS
];
// DNS配置
const dnsConfig = {
  "enable": true,
  "listen": "0.0.0.0:53",
  "ipv6": false,
  "prefer-h3": true,
  "respect-rules": true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    "*",
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
    "localhost.work.weixin.qq.com"
  ],
  "default-nameserver": ["119.29.29.29", "223.5.5.5"],//可修改成自己ISP的DNS
  "nameserver": [...foreignNameservers],
  "proxy-server-nameserver":[...domesticNameservers],
  "nameserver-policy": {
    "geosite:private,cn": domesticNameservers
  }
};

// 代理组通用配置
const groupBaseOption = {
  "interval": 300,
  "tolerance": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
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
    "name": "节点选择",
    "type": "select",
    "include-all": true,
    "proxies": ["美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "icon": "https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Auto.png",
  },
  {
    ...groupBaseOption,
    "name": "中国服务",
    "type": "select",
    "proxies": ["全局直连", "节点选择", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "default": "全局直连",
    "include-all": true,
    "icon": "https://raw.githubusercontent.com/Orz-3/mini/master/Color/CN.png"
  },
  {
    ...groupBaseOption,
    "name": "国外服务",
    "type": "select",
    "proxies": ["节点选择", "全局直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "default": "节点选择",
    "include-all": true,
    "icon": "https://raw.githubusercontent.com/Orz-3/mini/master/Color/UN.png"
  },
  {
    ...groupBaseOption,
    "name": "谷歌服务",
    "type": "select",
    "proxies": ["节点选择", "全局直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "default": "美国节点",
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
  },
  {
    ...groupBaseOption,
    "name": "YouTube",
    "type": "select",
    "proxies": ["节点选择", "全局直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "default": "美国节点",
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
  },
  {
    ...groupBaseOption,
    "name": "Netflix",
    "type": "select",
    "proxies": ["节点选择", "全局直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/netflix.svg"
  },
  {
    ...groupBaseOption,
    "name": "电报消息",
    "type": "select",
    "proxies": ["节点选择", "全局直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
  },
  {
    ...groupBaseOption,
    "name": "ChatGPT",
    "type": "select",
    "include-all": true,
    "proxies": ["节点选择", "全局直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg"
  },
  {
    ...groupBaseOption,
    "name": "微软服务",
    "type": "select",
    "proxies": ["节点选择", "全局直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
  },
  {
    ...groupBaseOption,
    "name": "苹果服务",
    "type": "select",
    "proxies": ["节点选择", "全局直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
  },
  {
    ...groupBaseOption,
    "name": "Jetbrains服务",
    "type": "select",
    "proxies": ["节点选择", "全局直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": true,
    "icon": "https://raw.githubusercontent.com/liangjunheng/VPN_RULE/master/icon/JetBrains.png"
  },
  {
    ...groupBaseOption,
    "name": "Spotify",
    "type": "select",
    "proxies": ["节点选择", "全局直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/icon/spotify.svg"
  },
  {
    ...groupBaseOption,
    "name": "漏网之鱼",
    "type": "select",
    "proxies": ["节点选择", "全局直连", "美国节点", "香港节点", "新加坡节点", "台湾节点", "日本节点", "韩国节点", "其它地区节点"],
    "include-all": true,
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
  },
  {
    ...groupBaseOption,
    "name": "全局直连",
    "type": "select",
    "proxies": ["DIRECT"],
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
  },
  {
    ...groupBaseOption,
    "name": "全局拦截",
    "type": "select",
    "proxies": ["REJECT"],
    "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
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
  "icloud": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    "path": "./ruleset/loyalsoldier/icloud.yaml"
  },
  "apple": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    "path": "./ruleset/loyalsoldier/apple.yaml"
  },
  "google": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
    "path": "./ruleset/loyalsoldier/google.yaml"
  },
  "JetbrainsDomain": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://raw.githubusercontent.com/LM-Firefly/Rules/master/Clash-RuleSet-Classical/PROXY/Jetbrains.yaml",
    "path": "./ruleset/loyalsoldier/jetbrainsDomain.yaml"
  },
  "proxy": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    "path": "./ruleset/loyalsoldier/proxy.yaml"
  },
  "ChinaDomain": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/China/China_Classical.yaml",
    "path": "./ruleset/loyalsoldier/ChinaDomain.yaml"
  },
  "private": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    "path": "./ruleset/loyalsoldier/private.yaml"
  },
  "gfw": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    "path": "./ruleset/loyalsoldier/gfw.yaml"
  },
  "tld-not-cn": {
    ...ruleProviderCommon,
    "behavior": "domain",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    "path": "./ruleset/loyalsoldier/tld-not-cn.yaml"
  },
  "telegramcidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    "path": "./ruleset/loyalsoldier/telegramcidr.yaml"
  },
  "cncidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    "path": "./ruleset/loyalsoldier/cncidr.yaml"
  },
  "lancidr": {
    ...ruleProviderCommon,
    "behavior": "ipcidr",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    "path": "./ruleset/loyalsoldier/lancidr.yaml"
  },
  "applications": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    "path": "./ruleset/loyalsoldier/applications.yaml"
  },
  "bahamut": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/Bahamut.txt",
    "path": "./ruleset/xiaolin-007/bahamut.yaml"
  },
  "YouTube": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/YouTube.txt",
    "path": "./ruleset/xiaolin-007/YouTube.yaml"
  },
  "Netflix": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/Netflix.txt",
    "path": "./ruleset/xiaolin-007/Netflix.yaml"
  },
  "Spotify": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": "https://fastly.jsdelivr.net/gh/xiaolin-007/clash@main/rule/Spotify.txt",
    "path": "./ruleset/xiaolin-007/Spotify.yaml"
  },
};

// 规则
const rules = [
  // 自定义规则
  "DOMAIN-SUFFIX,github.io,微软服务", // Github Pages
  "DOMAIN,v2rayse.com,国外服务", // V2rayse节点工具
  "DOMAIN,linux.do,中国服务",
  // Loyalsoldier 规则集
  "RULE-SET,lancidr,全局直连,no-resolve",
  "RULE-SET,google,谷歌服务",
  "RULE-SET,icloud,微软服务",
  "RULE-SET,apple,苹果服务",
  "RULE-SET,JetbrainsDomain,Jetbrains服务",
  "RULE-SET,telegramcidr,电报消息,no-resolve",
  "RULE-SET,YouTube,YouTube",
  "RULE-SET,Netflix,Netflix",
  "RULE-SET,Spotify,Spotify",
  "RULE-SET,ChinaDomain,中国服务",
  "RULE-SET,applications,中国服务",
  "RULE-SET,private,中国服务",
  "RULE-SET,cncidr,中国服务,no-resolve",
  "RULE-SET,proxy,国外服务",
  "RULE-SET,gfw,国外服务",
  "RULE-SET,tld-not-cn,国外服务",
  // 其他规则
  "GEOIP,LAN,全局直连,no-resolve",
  "GEOSITE,CN,中国服务",
  "GEOIP,CN,中国服务,no-resolve",
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
