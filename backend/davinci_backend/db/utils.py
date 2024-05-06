from datetime import datetime
import shortuuid
from shortuuid.main import int_to_string

alphabet = shortuuid.ShortUUID().get_alphabet()


# Generate a nice-looking ID with the given prefix
def generate_id(prefix: str) -> str:
    random_part = shortuuid.ShortUUID().random(length=14)
    timestamp = int(datetime.now().timestamp())

    return f"{prefix}_{int_to_string(timestamp, alphabet)}{random_part}"
