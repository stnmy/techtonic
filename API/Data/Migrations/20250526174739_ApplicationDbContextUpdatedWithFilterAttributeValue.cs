using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class ApplicationDbContextUpdatedWithFilterAttributeValue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FilterAttributeValue_FilterAttribute_FilterAttributeId",
                table: "FilterAttributeValue");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FilterAttributeValue",
                table: "FilterAttributeValue");

            migrationBuilder.RenameTable(
                name: "FilterAttributeValue",
                newName: "FilterAttributeValues");

            migrationBuilder.RenameIndex(
                name: "IX_FilterAttributeValue_FilterAttributeId",
                table: "FilterAttributeValues",
                newName: "IX_FilterAttributeValues_FilterAttributeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FilterAttributeValues",
                table: "FilterAttributeValues",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FilterAttributeValues_FilterAttribute_FilterAttributeId",
                table: "FilterAttributeValues",
                column: "FilterAttributeId",
                principalTable: "FilterAttribute",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FilterAttributeValues_FilterAttribute_FilterAttributeId",
                table: "FilterAttributeValues");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FilterAttributeValues",
                table: "FilterAttributeValues");

            migrationBuilder.RenameTable(
                name: "FilterAttributeValues",
                newName: "FilterAttributeValue");

            migrationBuilder.RenameIndex(
                name: "IX_FilterAttributeValues_FilterAttributeId",
                table: "FilterAttributeValue",
                newName: "IX_FilterAttributeValue_FilterAttributeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FilterAttributeValue",
                table: "FilterAttributeValue",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FilterAttributeValue_FilterAttribute_FilterAttributeId",
                table: "FilterAttributeValue",
                column: "FilterAttributeId",
                principalTable: "FilterAttribute",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
