from django.utils import timezone
from datetime import datetime

def get_time_ago(upload_time):
    """
    Calculate time difference between now and upload time
    """
    now = timezone.now()
    diff = now - upload_time
    
    seconds = diff.total_seconds()
    
    # Years
    if seconds >= 31536000:  # 365 days
        years = int(seconds / 31536000)
        return f"{years} {'year' if years == 1 else 'years'} ago"
    
    # Months
    if seconds >= 2592000:  # 30 days
        months = int(seconds / 2592000)
        return f"{months} {'month' if months == 1 else 'months'} ago"
    
    # Days
    if seconds >= 86400:
        days = int(seconds / 86400)
        return f"{days} {'day' if days == 1 else 'days'} ago"
    
    # Hours
    if seconds >= 3600:
        hours = int(seconds / 3600)
        return f"{hours} {'hour' if hours == 1 else 'hours'} ago"
    
    # Minutes
    if seconds >= 60:
        minutes = int(seconds / 60)
        return f"{minutes} {'minute' if minutes == 1 else 'minutes'} ago"
    
    # Seconds
    return f"{int(seconds)} {'second' if seconds == 1 else 'seconds'} ago"