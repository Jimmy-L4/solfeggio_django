# -*- encoding: utf-8 -*-
"""
@File    :   tasks.py   
@Contact :   licm@bupt.edu.cn
@License :   (C)Copyright Null
 
@Modify Time      @Author    @Version    @Description
------------      -------    --------    -----------
2023/11/7 20:16   Jimmy.li      1.0       异步线程任务
"""

from pydub import AudioSegment

from homework.models import SightsingingRecord


def convert_to_mp3(recordId, audioPath):
    record_instance = SightsingingRecord.objects.get(id=recordId)
    if not audioPath.endswith(".wav"):
        print("文件路径错误！" + audioPath)
        return
    wav_path = 'media/' + audioPath.split('/media/')[1]
    wav_audio = AudioSegment.from_wav(wav_path)
    mp3_path = wav_path.replace(".wav", ".mp3")
    newAudioPath = audioPath.replace(".wav", ".mp3")
    wav_audio.export(mp3_path, format="mp3")
    record_instance.audio = newAudioPath
    record_instance.save()
    print("文件转换完成，路径为：" + mp3_path)
