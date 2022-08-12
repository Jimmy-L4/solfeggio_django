from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import Http404
from rest_framework import status

from notice.models import Notice
from notice.serializers import NoticeListSerializer
from user.permissions import IsAdminUserOrReadOnly


class NoticeList(APIView):
    permission_classes = [IsAdminUserOrReadOnly]

    # 添加用户信息至notice
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_object(self, pk):
        """获取单个通知"""
        try:
            # pk 即主键，默认状态下就是 id
            return Notice.objects.get(pk=pk)
        except:
            raise Http404

    def get(self, request):
        if request.GET.get('display') == 'true':
            notice = Notice.objects.filter(type=1)
        else:
            notice = Notice.objects.filter(type__gte=0)

        serializer = NoticeListSerializer(notice, many=True)
        data = []
        for notice in serializer.data:
            param = {'id': notice['id'],
                     'user': {'nickname': notice['nickname'], 'avatar': notice['avatar']},
                     'project': {'title': notice['title'], 'content': notice['content'], 'class': notice['classes'],
                                 'type': notice['type']},
                     'startAt': notice['created']}
            data.append(param)
        # 返回 Json 数据
        return Response(data)

    def put(self, request):
        id = request.data.get('id')
        notice = self.get_object(id)
        serializer = NoticeListSerializer(notice, data=request.data)
        # 验证提交的数据是否合法
        # 不合法则返回400
        if serializer.is_valid():
            # 序列化器将持有的数据反序列化后，
            # 保存到数据库中
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = NoticeListSerializer(data=request.data)
        # 验证提交的数据是否合法
        # 不合法则返回400
        if serializer.is_valid():
            # 序列化器将持有的数据反序列化后，
            # 保存到数据库中
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        id = request.data.get('id')
        notice = self.get_object(id)
        serializer = NoticeListSerializer(notice, data=request.data)
        # 验证提交的数据是否合法
        # 不合法则返回400
        if serializer.is_valid():
            # 序列化器将持有的数据反序列化后，
            # 保存到数据库中
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
