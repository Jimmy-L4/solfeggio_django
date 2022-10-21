from PIL import Image, ImageFont, ImageDraw
import random
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'solfeggio_django.settings')
django.setup()

from user.models import Student
from user.serializers import StudentSerializer


def CreateImg(text, studentId):
    fontSize = 400
    liens = text.split('\n')
    # 画布颜色
    colors = ['#8139fd', '#00d6ba', '#fc9826', '#3b75fb']

    im = Image.new("RGB", (1000, 1000), colors[random.randint(0, 3)])
    dr = ImageDraw.Draw(im)

    fontPath = r"C:\Windows\Fonts\simhei.ttf"

    font = ImageFont.truetype(fontPath, fontSize)
    # 文字颜色
    dr.text((100, 300), text, font=font, fill="#FFFFFF")
    im.save(r'../../media/avatar/%s.png' % studentId)


def getStudents():
    items = Student.objects.all()
    for item in items:
        info = StudentSerializer(item).data
        data = {'avatar': '/media/avatar/%s.png' % info['id']}

        info.update(data)
        # 更新数据
        verify_data = StudentSerializer(instance=item, data=info)

        if verify_data.is_valid():
            verify_data.save()
        else:
            raise Exception(verify_data.errors, "更新数据失败")

        if len(info['name']) != 2:
            name = info['name'][1:3]
        else:
            name = info['name']
        print(name, info['id'])
        CreateImg(name, info['id'])

    print(len(items))


if __name__ == '__main__':
    getStudents()
    # CreateImg('崇明', '2021111708')
