import { SelectQueryBuilder } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { isIn } from 'class-validator';

export const uuid = () => uuidv4();

export const url = (link: string) => {
  const base = process.env.BACKEND_DOMAIN + '/' + process.env.PREFIX;

  if (link.charAt(0) == '/') {
    return base + link;
  }
  return base + '/' + link;
};

export interface AssociativeArray {
  [key: string]: string | boolean | number;
}

export const filterQueryBuilderFromRequest = <T>(
  q: SelectQueryBuilder<T>,
  filters?: AssociativeArray,
) => {
  if (filters) {
    const keys = Object.keys(filters);

    const alias = q.alias;

    for (const key of keys) {
      const value = filters[key];

      if (isIn(key, ['limit', 'offset', 'page'])) continue;

      if (key === 'from') {
        q.andWhere(`${alias}.createdAt >= '${value}'`);
        continue;
      }
      if (key === 'to') {
        q.andWhere(`${alias}.createdAt <= '${value}'`);

        continue;
      }

      if (typeof value === 'string') {
        q.andWhere(
          `LOWER(${alias}.${key})  LIKE  '${value.toLocaleLowerCase()}%' `,
        );
      } else if (typeof value === 'number') {
        q.andWhere(`${alias}.${key} = ${value} `);
      } else if (typeof value === 'boolean') {
        q.andWhere(`${alias}.${key} = ${value}`);
      }
    }
  }
};
