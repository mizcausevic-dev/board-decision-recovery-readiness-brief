$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 10, 15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233, 243, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 200, 218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 255, 139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 199, 255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Board Decision Recovery Readiness Brief", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic scenario render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ScenarioImage -Title "Board-ready overview for decision-path recovery readiness" -Subtitle "One executive scorecard for restore windows, fallback owners, redundancy, and board confidence." -Bullets @(
  "The overview keeps constrained lanes, recovery priorities, and value at stake visible in one board-safe surface.",
  "Leadership can see which decision paths will recover cleanly and which ones still depend on one overloaded fallback route.",
  "This layer turns scattered restore weakness into one repeatable recovery-readiness packet instead of another manual memo."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ScenarioImage -Title "Recovery lanes keep owner, audience, recovery theme, and next move connected" -Subtitle "Every route retains the owner, audience, action, recovery theme, handoff counts, restore hours, and board confidence." -Bullets @(
  "The recovery-lanes view makes it obvious which systems can recover after a break and which ones still depend on a thin fallback path.",
  "Board questions stay attached to actual restore weakness instead of vague operating language.",
  "Leadership can reinforce one lane at a time without losing sight of the portfolio story."
) -OutputPath (Join-Path $screenshots "02-recovery-lanes-proof.png")

New-ScenarioImage -Title "Fallback map shows where the next board cycle will expose a weak restore path" -Subtitle "Readiness headlines, recovery signals, weakest fallback routes, and required recovery moves stay visible in one board readout." -Bullets @(
  "This view keeps AI, identity, revenue, procurement, FinTech, and biotech lanes tied to the exact fallback point that would fail during recovery.",
  "Thin fallback ownership and low redundancy stay visible before the board assumes the path can restore cleanly.",
  "Leadership can see exactly where one new owner or redundant route would buy another clean cycle."
) -OutputPath (Join-Path $screenshots "03-fallback-map-proof.png")

New-ScenarioImage -Title "Recovery posture keeps action, severity, and restore exposure tied together" -Subtitle "Composite recovery risk, severity signals, and board-safe action stay grounded in the same operating view." -Bullets @(
  "The recovery-posture view keeps handoff strain, restore windows, escalation fragility, fallback-owner weakness, and board-confidence loss in one scorecard.",
  "Low redundancy remains visible before leadership assumes the path can absorb another break-and-recover cycle.",
  "This creates a repeatable packet that can travel into board, diligence, and operating reviews."
) -OutputPath (Join-Path $screenshots "04-recovery-posture-proof.png")
