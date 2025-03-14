let data = [];
let variable = 'Y';
var headers = ["TimeStamp","Title", "Resolution","CodeType","FPS","Video DataRate","Audio DataRate","Speed","Dropped Frames","Codec","Session Id","Stream Host","Stream Host","Video Buffered","Audio Buffered","DID"];

async function fetchVideoTitles() {
    //await sleep(5000);

    for(var i = 1; i <= 100000; i++){
    const Type = [];

    var ElementType = document.querySelectorAll('li > p > span');
    while(ElementType.length === 0){
        await sleep(300);
        ElementType = document.querySelectorAll('li > p > span');
    }
    var Time = timestampToSystemTime(new Date().getTime());
    Type.push(Time);

    var title = document.querySelector('#app > div.flex-col.w-100vw.h-100vh > div.flex-1.flex.relative.of-h > div:nth-child(1) > div > div.swiper.swiper-initialized.swiper-vertical.swiper-pointer-events > div > div.swiper-slide.w-100-p.h-100-p.flex-col.swiper-slide-active > div > div.player.flex-1 > div > div > div > div.bar.bar-top.head-bar > div > div');
    Type.push(title.innerHTML + " ");

    for(var i = 0; i < 14; i++){
        Type.push(ElementType[i].innerHTML);
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
    a.download = 'video_data_kuaishoulive.csv';
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