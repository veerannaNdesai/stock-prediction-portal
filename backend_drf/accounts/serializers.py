from django.contrib.auth.models import User
from rest_framework import serializers

'''
    serializers are the once converts the jason --> python objects or vice versa and validate the data
    and give response to the requests
'''
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,style={'input_type':'password'},min_length=8)
    class Meta:
        model = User
        fields = ['username','email','password']

    ''' create() function is a method from ModelSerializer class which takes validated_data as argument 
        returns the user object
    '''
    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)

        return user