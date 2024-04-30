from datetime import datetime
import shortuuid


def generate_id(prefix: str) -> str:
    random_part = shortuuid.ShortUUID().random(length=14)
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")

    return f"{prefix}_{timestamp}{random_part}"
