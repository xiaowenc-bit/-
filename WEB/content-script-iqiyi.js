let data = [];
let variable = 'Y';
var headers = ["TimeStamp","Title", "Loading Speed","Buffer Duration","Frame Loss","Frame Loss Ratio","Video Protocol","CDN","Resolution Ratio","View Size","Volume Value","Player Engine","Resource Type","DRM"];

async function fetchVideoTitles() {
    //await sleep(5000);
    
    for(var i = 1; i <= 100000; i++){
    const Type = [];

    var speed = document.querySelector('.iqp-loading-speed-text');
    while(speed === null){
        await sleep(300);
        speed = document.querySelector('.iqp-loading-speed-text');
    }

    var Time = timestampToSystemTime(new Date().getTime());
    Type.push(Time);

    var videoElements = document.querySelector('.header-link.link');
    Type.push(videoElements.innerHTML + " ");

    Type.push(speed.innerHTML);

    var waiting = document.querySelector('[data-player-hook="infoPanelWaitingValue"]');
    Type.push(waiting.innerHTML);

    var lost1 = document.querySelector('[data-player-hook="infoPanelLostValue1"]');
    var lost2 = document.querySelector('[data-player-hook="infoPanelLostValue2"]');
    Type.push(lost1.innerHTML + lost2.innerHTML);

    var protocol = document.querySelector('[data-player-hook="infoPanelProtocolValue"]');
    Type.push(protocol.innerHTML);

    var cdn = document.querySelector('[data-player-hook="infoPanelCdnValue"]');
    Type.push(cdn.innerHTML);

    var solution = document.querySelector('[data-player-hook="infoPanelSolutionValue"]');
    Type.push(solution.innerHTML);

    var videosize = document.querySelector('[data-player-hook="infoPanelVideoSizeValue"]');
    Type.push(videosize.innerHTML);

    var voice = document.querySelector('[data-player-hook="infoPanelVoiceValue"]');
    Type.push(voice.innerHTML);
    var engine = document.querySelector('[data-player-hook="infoPanelEngineValue"]');
    Type.push(engine.innerHTML);
    var videotype = document.querySelector('[data-player-hook="infoPanelVideoTypeValue"]');
    Type.push(videotype.innerHTML);
    var drm = document.querySelector('[data-player-hook="infoPanelDRMValue"]');
    Type.push(drm.innerHTML);

    data.push(Type);
    await sleep(500);

    //console.log(Type);
    //console.log(i);

    }
}
fetchVideoTitles();


window.onbeforeunload = function() {
    const csvContent = headers.join(",") + "\n" + data.map(row =>row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'video_data_iqiyi.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
};

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function timestampToSystemTime(timestamp) {
    const date = new Date(timestamp);
    const systemTime = date.toISOString();
    return systemTime;
}