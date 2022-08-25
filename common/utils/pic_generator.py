from PIL import Image, ImageFont, ImageDraw


def CreateImg(text):
    fontSize = 400
    liens = text.split('\n')
    # 画布颜色
    im = Image.new("RGB", (1000, 1000), '#001529')
    dr = ImageDraw.Draw(im)
    # 字体样式，文章结尾我会放上连接
    fontPath = r"C:\Windows\Fonts\simhei.ttf"

    font = ImageFont.truetype(fontPath, fontSize)
    # 文字颜色
    dr.text((100, 300), text, font=font, fill="#FFFFFF")
    im.save(r'../../media/avatar/test.png')
    im.show()


if __name__ == '__main__':
    CreateImg('测试')
