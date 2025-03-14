# -
本项目为自编网络流数据采集工具，下面介绍背景以及用法。

本项目为华为音视频项目的分支，音视频项目中指出要实现基于网络流的端侧音视频质量推断因此首先要采集音视频的端侧播放质量信息以及对应的网络流，作为后续方案研究及性能测试数据
集。

因此利用Python和Wireshark结合开发了数据块采集工具。

首先是主函数a.py,利用双线程打开网页并且开始播放视频以及打开网络监听工具，抓取网络流，具体实现请看a.py。

其次一系列.js文件用于抓取各大主流视频网站视频页面信息并生成 CSV 文件，脚本。
（直接运行代码即可）

----------------------------------------------------
# -
This project is a self-compiled network flow data collection tool, and the background and usage are introduced below. 

This project is a branch of Huawei's audio and video project, which points out that in order to achieve end-to-end audio and video quality inference based on network flows, it is necessary to first collect the device-side playback quality information of audio and video and the corresponding network flow as follow-up solution research and performance test data Assemble. 

Therefore, a data block collection tool was developed using a combination of Python and Wireshark. The first is the main function a.py, which uses double threading to open a web page and start playing a video and open the network listening tool to capture the network stream, see a.py for the specific implementation. 

Secondly, a series of .js files are used to scrape the video page information of major mainstream video websites and generate CSV files and scripts.
(Just run the code directly)
