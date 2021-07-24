import { Brackets } from 'typeorm';

export function isNullOrWhere({
  field,
  value,
  valueAlias,
}: {
  field: string;
  valueAlias: string;
  value: string | number;
}) {
  return new Brackets(qb => {
    qb.where(`${field} IS NULL`);
    qb.orWhere(`${field} = :${valueAlias}`, {
      [valueAlias]: value,
    });
  });
}
