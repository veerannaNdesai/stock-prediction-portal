import os
from django.conf import settings
import matplotlib.pyplot as plt

def get_plot_url(img_name):
    file_path = os.path.join(settings.MEDIA_ROOT,img_name)
    plt.savefig(file_path)
    plt.close()
    plot_img = settings.MEDIA_URL + img_name

    return plot_img
