# 从docker仓库拉取带有Python 3.9的Linux环境
FROM python:3.9

# 设置Python的环境变量
ENV PYTHONUNBUFFERED 1

#  创建code 文件，并且设为工作目录
RUN mkdir /code
WORKDIR /code

# 更新pip
RUN pip install pip -U

#  将requirements.txt 复制到容器的code目录
ADD requirements.txt /code/

# 安装需要的库
RUN pip install -r requirements.txt

# 将当前目录复制到容器中code目录
ADD . /code/
