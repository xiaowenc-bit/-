import subprocess
from threading import Thread
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import csv
import time
from datetime import datetime


C = ["TimeStamp", "Title", "Mime Type", "Player Type", "Resolution", "Video DataRate",
        "Audio DataRate", "Segments", "Dropped Frames", "Video Host", "Audio Host",
        "Video Speed", "Audio Speed", "Network Activity"]
h = ["TimeStamp", "Title", "Mime Type Video", "Mime Type Audio", "Player Type", "Resolution",
           "Video DataRate", "Audio DataRate", "Segments", "Dropped Frames", "Video Host",
           "Audio Host", "Video Speed", "Audio Speed", "Network Activity"]
data = []


# 定义函数将时间戳转换为系统时间
def _system_time():
    system_time = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    return system_time


def start_tshark():
    # 构建 tshark 命令
    interface = 'WLAN'
    output_file = 'C:\\Users\\86156\\Desktop\\a\\1080x.pcap'
    duration = 420  # 5分钟
    tshark_cmd = [
        'D:\\Windows Kits\\wireshark\\tshark.exe',
        '-i', interface,
        '-a', 'duration:' + str(duration),
        '-w', output_file
    ]
    time.sleep(10)  # 等待视频加载
    subprocess.Popen(tshark_cmd)


def play_video():
    video_url = 'https://www.bilibili.com/video/BV1hD421T7Cs/?spm_id_from=333.1007.tianma.1-2-2.click&vd_source=2e53604d3d3b9ce23747832c1899462c'

    options = webdriver.ChromeOptions()
    options.add_argument(r'--load-extension=C:\Users\86156\Desktop\WEB')
    options.add_argument(r"user-data-dir=C:\Users\86156\AppData\Local\Google\Chrome\User Data\Profile 2\Network")
    driver = webdriver.Chrome(options=options)

    driver.get(video_url)  # 打开视频播放

    time.sleep(10)  # 等待视频加载

    player = driver.find_element(By.XPATH, '/html/body/div[2]/div[2]/div[1]/div[2]/div[2]/div/div/div[1]/div[1]')
    ActionChains(driver).context_click(player).perform()
    menu = driver.find_element(By.XPATH, '/html/body/div[2]/div[2]/div[1]/div[2]/div[2]/div/div/div[4]/ul/li[6]')
    ActionChains(driver).click(menu).perform()

    print("浏览器已启动，视频开始播放...")

    # 获取视频信息
    for _ in range(600):  # 运行5分钟,0.5*600
        try:
            video_elements = driver.find_elements(By.CSS_SELECTOR, "div#viewbox_report.video-info-container.report-wrap-module.report-scroll-module")
            MimeTypeElements = driver.find_elements(By.CSS_SELECTOR, "div.info-line")

            # 等待直到获取到 Mime Type 元素
            while len(MimeTypeElements) == 0:
                time.sleep(0.3)
                MimeTypeElements = driver.find_elements(By.CSS_SELECTOR, "div.info-line")

            # 获取时间戳和视频标题
            time_stamp = _system_time()
            video_title = video_elements[0].find_element(By.CSS_SELECTOR, "h1.video-title").text

            # 构造视频信息列表
            Type = [time_stamp, video_title]
            for i in range(12):
                Type.append(MimeTypeElements[i].text.replace(C[i + 2] + ':', '').strip())

            # 添加到数据列表中
            data.append(Type)
        except Exception as e:
            print(f"Error fetching video data: {e}")
        time.sleep(0.5)

    with open('video_data_bilibili.csv', mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(h)
        for row in data:
            writer.writerow(row)

    driver.quit()


# 创建两个线程
wireshark_thread = Thread(target=start_tshark)
video_thread = Thread(target=play_video)
wireshark_thread.start()
video_thread.start()
wireshark_thread.join()
video_thread.join()
