import { Injectable } from '@nestjs/common';
import { RolesEnum as Role } from '@/enums';

interface IsAuthorizedParams {
  currentRole: Role;
  requiredRole: Role;
}

@Injectable()
export class AccessContorlService {
  private hierarchies: Array<Map<string, number>> = [];
  private priority = 1;

  constructor() {
    this.buildRoles([Role.ADMIN]);
    this.buildRoles([Role.GUEST, Role.USER, Role.ADMIN]);
  }

  /**
   * The buildRoles method allows for creating a role hierarchy between specified set of roles.
   * Roles have to be specified from least privileged user to the most privileged one
   * @param roles Array that contains a list of roles
   */
  private buildRoles(roles: Role[]) {
    const hierarchy: Map<string, number> = new Map();
    roles.forEach((role) => {
      hierarchy.set(role, this.priority);
      this.priority++;
    });
    this.hierarchies.push(hierarchy);
  }

  public isAuthorized({ currentRole, requiredRole }: IsAuthorizedParams) {
    for (const hierarchy of this.hierarchies) {
      const priority = hierarchy.get(currentRole);
      const requiredPriority = hierarchy.get(requiredRole);

      if (
        priority !== undefined &&
        requiredPriority !== undefined &&
        priority <= requiredPriority
      ) {
        return true;
      }
    }
    return false;
  }

  public getRole({ currentRole, requiredRole }: IsAuthorizedParams) {
    for (const hierarchy of this.hierarchies) {
      const priority = hierarchy.get(currentRole);
      const requiredPriority = hierarchy.get(requiredRole);

      if (
        priority !== undefined &&
        requiredPriority !== undefined &&
        priority <= requiredPriority
      ) {
        return requiredRole;
      }
    }
    return currentRole;
  }
}
