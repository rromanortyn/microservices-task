import { MigrationInterface, QueryRunner } from 'typeorm'

class AddVehicleEntity1776341132450 implements MigrationInterface {
	name = 'AddVehicleEntity1776341132450'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE "vehicles" (
				"id" SERIAL NOT NULL, 
				"year" integer NOT NULL, 
				"model" character varying(255) NOT NULL, 
				"userId" integer, 
				CONSTRAINT "PK_18d8646b59304dce4af3a9e35b6" PRIMARY KEY ("id")
			)
		`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "vehicles"`)
	}
}

export default AddVehicleEntity1776341132450
