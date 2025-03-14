import matplotlib.pyplot as plt

# 曲线a的数据点
resolutions_a = [360, 480, 720, 1080]
sizes_a = [12737, 16500, 24242, 47060]

# 曲线b的数据点
resolutions_b = [360, 480, 720, 1080]
sizes_b = [12749, 19527, 25559, 44367]

# 画出曲线图
plt.plot(resolutions_a, sizes_a, label='曲线a')
plt.plot(resolutions_b, sizes_b, label='曲线b')

# 设置横坐标刻度
plt.xticks([360, 480, 720, 1080])

# 设置纵坐标刻度
plt.yticks([10000, 20000, 30000, 40000, 50000])

# 设置图形属性
plt.xlabel('p')
plt.ylabel('bit')
plt.title('曲线图')
plt.grid(True)
plt.legend()

# 显示图形
plt.show()
