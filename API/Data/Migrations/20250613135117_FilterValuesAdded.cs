using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class FilterValuesAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FilterAttribute_Categories_CategoryId",
                table: "FilterAttribute");

            migrationBuilder.DropForeignKey(
                name: "FK_FilterAttributeValues_FilterAttribute_FilterAttributeId",
                table: "FilterAttributeValues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FilterAttribute",
                table: "FilterAttribute");

            migrationBuilder.RenameTable(
                name: "FilterAttribute",
                newName: "FilterAttributes");

            migrationBuilder.RenameIndex(
                name: "IX_FilterAttribute_CategoryId",
                table: "FilterAttributes",
                newName: "IX_FilterAttributes_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FilterAttributes",
                table: "FilterAttributes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FilterAttributes_Categories_CategoryId",
                table: "FilterAttributes",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FilterAttributeValues_FilterAttributes_FilterAttributeId",
                table: "FilterAttributeValues",
                column: "FilterAttributeId",
                principalTable: "FilterAttributes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FilterAttributes_Categories_CategoryId",
                table: "FilterAttributes");

            migrationBuilder.DropForeignKey(
                name: "FK_FilterAttributeValues_FilterAttributes_FilterAttributeId",
                table: "FilterAttributeValues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FilterAttributes",
                table: "FilterAttributes");

            migrationBuilder.RenameTable(
                name: "FilterAttributes",
                newName: "FilterAttribute");

            migrationBuilder.RenameIndex(
                name: "IX_FilterAttributes_CategoryId",
                table: "FilterAttribute",
                newName: "IX_FilterAttribute_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FilterAttribute",
                table: "FilterAttribute",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FilterAttribute_Categories_CategoryId",
                table: "FilterAttribute",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FilterAttributeValues_FilterAttribute_FilterAttributeId",
                table: "FilterAttributeValues",
                column: "FilterAttributeId",
                principalTable: "FilterAttribute",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
