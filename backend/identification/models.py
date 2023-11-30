from django.db import models

# Create your models here.
class User(models.Model):

    username = models.TextField()
    password = models.TextField()
    admin = models.BooleanField(default=False)
    phonenumber = models.TextField(default="0")

    has_paid = models.BooleanField(default=False)

    profile_picture = models.ImageField(blank=True)

    follow = models.ManyToManyField('self', symmetrical=False)
    favorit_recipies = models.ManyToManyField("recipe.Recipe")

    def toDict(self):
        try:
            pic = self.profile_picture.name
        except:
            pic = ""

        following = []
        for follow in self.follow.all():
            if follow != self: following.append(follow.pk)

        favorits = []
        for favorit in self.favorit_recipies.all():
            favorits.append({"id":favorit.pk})

        return {
            "username":self.username,
            "is_admin":self.admin,
            "phonenumber":self.phonenumber,
            "has_paid":self.has_paid,
            "picture": pic,
            "following":following,
            "favorit_recipes":favorits,
            "id":self.pk

        }



class Session(models.Model):

    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(to=User,on_delete=models.CASCADE)
    key = models.TextField()

    def checkSession(self):
        #checking if the session is older then 24 hours
        import datetime
        created = self.created.timestamp()
        now = datetime.datetime.now().timestamp()

        between = now-created
        print(between)


        if between > (10*60*60*60):
            self.delete()

    def save(self, *args, **kwargs):

        for session in Session.objects.all():
            session.checkSession()

        super(Session, self).save(*args, **kwargs)
