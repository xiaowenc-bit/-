let data = [];
let variable = 'Y';
var headers = ["TimeStamp","Title","Mime Type-1","Mime Type-2","Player Core","Video Resolution","Video Frame Rate","Audio Info-1","Audio Info-2","Audio Info-3","Encoder-1","Encoder-2","Stream Host","Buffer Length-1","Buffer Length-2","Decoded Frames-1","Decoded Frames-2","Download Bitrate"];

async function fetchVideoTitles() {
    //await sleep(5000);

    for(var i = 1; i <= 100000; i++){
    const Type = [];

    var ElementType = document.querySelectorAll('[class="web-player-line-data"]');
    while(ElementType.length === 0){
        await sleep(300);
        ElementType = document.querySelectorAll('[class="web-player-line-data"]');
    }
    console.log(ElementType.length);
    var Time = timestampToSystemTime(new Date().getTime());
    Type.push(Time);

    var title = document.querySelector('[class="text live-skin-main-text title-length-limit small-title"]');
    Type.push(title.innerHTML + " ");

    for(var i = 0; i < 9; i ++){
        Type.push(ElementType[i].textContent + " ");
    }

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
    a.download = 'video_data_bilibililive.csv';
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