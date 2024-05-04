from datetime import datetime
import shortuuid
from shortuuid.main import int_to_string

alphabet = shortuuid.ShortUUID().get_alphabet()


def generate_id(prefix: str) -> str:
    random_part = shortuuid.ShortUUID().random(length=14)
    timestamp = int(datetime.now().timestamp())

    return f"{prefix}_{int_to_string(timestamp, alphabet)}{random_part}"
