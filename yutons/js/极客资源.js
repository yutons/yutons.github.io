// https://www.jkdy.cc/api.php/provide/vod/?ac=list

var rule = {
    title: '极客资源',
    host: 'https://www.jkdy.cc',
    homeTid: '',
    cate_exclude: '',
    parse_url: 'https://www.jkdy.cc/jx/vid.php?url=',

    homeUrl: '/api.php/provide/vod/?ac=detail&t={{rule.homeTid}}',
    detailUrl: '/api.php/provide/vod/?ac=detail&ids=fyid',
    searchUrl: '/api.php/provide/vod/?wd=**&pg=fypage',
    url: '/api.php/provide/vod/?ac=detail&pg=fypage&t=fyclass',
    headers: {'User-Agent': 'MOBILE_UA'},
    timeout: 5000, // class_name: '电影&电视剧&综艺&动漫',
    // class_url: '1&2&3&4',
    // class_parse:'js:let html=request(input);input=JSON.parse(html).class;',
    class_parse: 'json:class;',
    limit: 20,
    multi: 1,
    searchable: 2,//是否启用全局搜索,
    quickSearch: 1,//是否启用快速搜索,
    filterable: 0,//是否启用分类筛选,
    play_parse: true,
    lazy: `js:
    if(/\\.(m3u8|mp4)/.test(input)){
        input = {parse:0,url:input}
    }else{
        if(rule.parse_url.startsWith('json:')){
            let purl = rule.parse_url.replace('json:','')+input;
            let html = request(purl);
            input = {parse:0,url:JSON.parse(html).url}
        }else{
            input= rule.parse_url+input; 
        }
    }
    `,
    推荐: '*',
    一级: 'json:list;vod_name;vod_pic;vod_remarks;vod_id;vod_play_from',
    二级: `js:
    let html=request(input);
    html=JSON.parse(html);
    let data=html.list;
    VOD=data[0];`,
    搜索: '*',
}