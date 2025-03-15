"""Initial migration

Revision ID: 702333586a7d
Revises: 2fb41e1ba4c1
Create Date: 2025-02-10 18:20:29.389403

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '702333586a7d'
down_revision: Union[str, None] = '2fb41e1ba4c1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
