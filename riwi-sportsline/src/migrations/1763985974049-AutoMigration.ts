import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1763985974049 implements MigrationInterface {
    name = 'AutoMigration1763985974049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "role" TO "roleId"`);
        await queryRunner.query(`ALTER TYPE "public"."users_role_enum" RENAME TO "users_roleid_enum"`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roleId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roleId" "public"."users_roleid_enum" NOT NULL DEFAULT 'analyst'`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`ALTER TYPE "public"."users_roleid_enum" RENAME TO "users_role_enum"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "roleId" TO "role"`);
    }

}
