import type { Team } from "./data";

export async function downloadExcel(teams: Team[]) {
  const { default: ExcelJS } = await import("exceljs");

  const wb = new ExcelJS.Workbook();
  wb.creator = "GANIT Ideathon Leaderboard";
  wb.created = new Date();

  const ws = wb.addWorksheet("Leaderboard", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  ws.columns = [
    { header: "Gen ID",      key: "gen_id",  width: 12 },
    { header: "Team Name",   key: "team",    width: 28 },
    { header: "Member Name", key: "member",  width: 32 },
    { header: "Role",        key: "role",    width: 12 },
    { header: "Mentor",      key: "mentor",  width: 28 },
    { header: "Use Case",    key: "usecase", width: 55 },
    { header: "Status",      key: "status",  width: 22 },
  ];

  // Header row styling
  const headerRow = ws.getRow(1);
  headerRow.height = 24;
  headerRow.eachCell((cell) => {
    cell.fill   = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1A00D9" } };
    cell.font   = { bold: true, color: { argb: "FFFFFFFF" }, size: 11 };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = { bottom: { style: "medium", color: { argb: "FF5E9EFF" } } };
  });

  teams.forEach((team, teamIdx) => {
    const altTeam = teamIdx % 2 === 1;
    const baseArgb = altTeam ? "FFF5F7FF" : "FFFFFFFF";

    team.members.forEach((member) => {
      const row = ws.addRow({
        gen_id:  team.gen_id,
        team:    team.team_name,
        member:  member.name,
        role:    member.captain ? "Captain" : "Member",
        mentor:  team.mentor,
        usecase: team.approved_usecase,
        status:  team.status,
      });
      row.height = 18;

      // Base styling for every cell in the row
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.fill      = { type: "pattern", pattern: "solid", fgColor: { argb: baseArgb } };
        cell.font      = { size: 10 };
        cell.alignment = { vertical: "middle" };
      });

      if (member.captain) {
        // Orange wash across the whole captain row
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFF0E6" } };
          cell.font = { size: 10, bold: true };
        });
        // Member name cell: orange text
        const nameCell = row.getCell("member");
        nameCell.font = { bold: true, color: { argb: "FFFE6E06" }, size: 10 };
        // Role badge cell: solid orange with white text
        const roleCell = row.getCell("role");
        roleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFE6E06" } };
        roleCell.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
        roleCell.alignment = { vertical: "middle", horizontal: "center" };
      }

      // Mentor column: always blue highlight regardless of row type
      const mentorCell = row.getCell("mentor");
      mentorCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDBEAFF" } };
      mentorCell.font = { bold: true, color: { argb: "FF1A00D9" }, size: 10 };
    });

    // Thin separator line after each team block
    const lastRow = ws.lastRow;
    if (lastRow) {
      lastRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = { bottom: { style: "thin", color: { argb: "FFDBEAFF" } } };
      });
    }
  });

  const buffer = await wb.xlsx.writeBuffer();
  const blob   = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href     = url;
  link.download = `GANIT_Ideathon_Leaderboard_${new Date().toISOString().slice(0, 10)}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
