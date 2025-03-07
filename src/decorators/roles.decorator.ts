import { SetMetadata } from '@nestjs/common';
import { RolesEnum as Role } from '@/enums';

export const ROLE_KEY = 'role';

export const Roles = (...role: Role[]) => SetMetadata(ROLE_KEY, role);
