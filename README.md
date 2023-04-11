# Solfeggio_django

[comment]: <> (🌍)

[comment]: <> (*[English]&#40;/docs/README-en.md&#41; ∙ [简体中文]&#40;README.md&#41;*)

基于`python3.7`和`Django3.0`的教学平台。   

[comment]: <> ([![Django CI]&#40;https://github.com/liangliangyy/DjangoBlog/actions/workflows/django.yml/badge.svg&#41;]&#40;https://github.com/liangliangyy/DjangoBlog/actions/workflows/django.yml&#41; [![CodeQL]&#40;https://github.com/liangliangyy/DjangoBlog/actions/workflows/codeql-analysis.yml/badge.svg&#41;]&#40;https://github.com/liangliangyy/DjangoBlog/actions/workflows/codeql-analysis.yml&#41; [![codecov]&#40;https://codecov.io/gh/liangliangyy/DjangoBlog/branch/master/graph/badge.svg&#41;]&#40;https://codecov.io/gh/liangliangyy/DjangoBlog&#41;  [![license]&#40;https://img.shields.io/github/license/liangliangyy/djangoblog.svg&#41;]&#40;&#41;  )

## 主要功能：
- 用户密码登录
- 学生提交练耳选择题作业
- 学生提交视唱作业
- 学生提交视唱听写题作业
- 教师查看学生学习状态
- 教师批改成绩


## 安装
mysql客户端从`pymysql`修改成了`mysqlclient`，具体请参考 [pypi](https://pypi.org/project/mysqlclient/) 查看安装前的准备。

推荐使用conda新建虚拟环境：

```conda create -n solfeggio_django python=3.7'```

使用pip安装： 

```pip install -Ur requirements.txt```

如果你没有pip，使用如下方式安装：
- OS X / Linux 电脑，终端下执行: 

    ```
    curl http://peak.telecommunity.com/dist/ez_setup.py | python
    curl https://bootstrap.pypa.io/get-pip.py | python
    ```

- Windows电脑：

    下载 http://peak.telecommunity.com/dist/ez_setup.py 和 https://raw.github.com/pypa/pip/master/contrib/get-pip.py 这两个文件，双击运行。 


## 运行

 修改`solfeggio_django/setting.py` 修改数据库配置，如下所示：

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'solfeggio_django',
        'USER': 'root',
        'PASSWORD': 'password',
        'HOST': 'host',
        'PORT': 3306,
    }
}
```

### 创建数据库
mysql数据库中执行:
```sql
CREATE DATABASE `solfeggio_django` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
```

然后终端下执行:
```bash
python manage.py makemigrations
python manage.py migrate
```

### 创建超级用户

 终端下执行:
```bash
python manage.py createsuperuser
```

### 创建测试数据
终端下执行:
```bash
python manage.py create_testdata
```

### 收集静态文件
终端下执行:  
```bash
python manage.py collectstatic --noinput
python manage.py compress --force
```

### 开始运行：
执行： `python manage.py runserver`


浏览器打开: http://127.0.0.1:8000/  就可以看到效果了。  

## 服务器部署
暂无


## 更多配置:
暂无

---

感谢jetbrains
<div>    
<a href="https://www.jetbrains.com/?from=DjangoBlog"><img src="https://resource.lylinux.net/image/2020/07/01/logo.png" width="150" height="150"></a>
</div>