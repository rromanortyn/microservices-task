import { MigrationInterface, QueryRunner } from 'typeorm'

class AddUserEntity1776340960443 implements MigrationInterface {
	name = 'AddUserEntity1776340960443'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE "users" (
				"id" SERIAL NOT NULL, 
				"email" character varying(255) NOT NULL, 
				"hashedPassword" character varying NOT NULL, 
				CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), 
				CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
			)
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "users"`)
	}
}

export default AddUserEntity1776340960443
