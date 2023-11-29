from django.db import models
from identification.models import User
import json
from django.forms.models import model_to_dict

class Comment(models.Model):
    content = models.TextField(default="")
    auther = models.ForeignKey(User,on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def toDict(self):
        return {
            "content":self.content,
            "auther":self.auther.toDict(),
            "id":self.pk,
            "created":self.created.timestamp()
        }

# Create your models here.
class Recipe(models.Model):
    auther           = models.ForeignKey(User,on_delete=models.CASCADE)
    title            = models.TextField(default="")
    description      = models.TextField(default="")
    # [ {"name":"name","amount":2}  ]
    ingredients      = models.JSONField(default=list)
    instructions     = models.JSONField(default=list)
    preperation_time = models.IntegerField(default=0)
    cooking_time     = models.IntegerField(default=0)
    servings         = models.IntegerField(default=0)
    difficulty       = models.IntegerField(default=0)
    category         = models.TextField(default="other")
    image            = models.ImageField(blank=True)
    # images           = models.ForeignKey(Image,on_delete=models.CASCADE, blank=True, null=True)
    notes            = models.TextField(default="")
    reviews          = models.IntegerField(default=0)
    reviewers        = models.IntegerField(default=0)
    comments         = models.ManyToManyField(Comment)


    created = models.DateTimeField(auto_now_add=True)

    def toDict(self):

        dic = model_to_dict(self)
        dic["auther"] = User.objects.filter(pk=dic["auther"])[0].toDict()
        try:
            dic["image"] = self.image.name
        except:
            dic["image"] = ""

        dic["created"] = self.created.timestamp()
        print(self.comments)
        dict_comments = []
        for comment in self.comments.all():
            dict_comments.append(comment.toDict())

        dic["comments"] = dict_comments


        return dic
