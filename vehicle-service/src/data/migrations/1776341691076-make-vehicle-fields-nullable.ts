import { MigrationInterface, QueryRunner } from 'typeorm'

class MakeVehicleFieldsNullable1776341691076 implements MigrationInterface {
	name = 'MakeVehicleFieldsNullable1776341691076'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE "vehicles" ALTER COLUMN "year" DROP NOT NULL
		`)
		await queryRunner.query(`
			ALTER TABLE "vehicles" ALTER COLUMN "model" DROP NOT NULL
		`)
		await queryRunner.query(`
			ALTER TABLE "vehicles" ALTER COLUMN "userId" SET NOT NULL
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE "vehicles" ALTER COLUMN "userId" DROP NOT NULL
		`)
		await queryRunner.query(`
			ALTER TABLE "vehicles" ALTER COLUMN "model" SET NOT NULL
		`)
		await queryRunner.query(`
			ALTER TABLE "vehicles" ALTER COLUMN "year" SET NOT NULL
		`)
	}
}

export default MakeVehicleFieldsNullable1776341691076
