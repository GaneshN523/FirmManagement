"""Initial migration

Revision ID: c5d2016e44f1
Revises: 702333586a7d
Create Date: 2025-02-10 22:42:39.435245

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c5d2016e44f1'
down_revision: Union[str, None] = '702333586a7d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
