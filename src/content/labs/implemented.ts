/** Component names LabHost must map. InteractiveSimLab is not allowed. */
export const LAB_HOST_COMPONENTS = [
  "LandscapeLab",
  "RaidLab",
  "MotherboardLab",
  "CableLab",
  "NetworkBuilderLab",
  "RouterLab",
  "WifiLab",
  "WindowsCliLab",
  "LinuxCliLab",
  "WindowsToolsLab",
  "MacOsLab",
  "PrinterLab",
  "PhishingLab",
  "MalwareLab",
  "PermissionsLab",
  "TicketLab",
  "BackupLab",
  "VoiceLab",
  "TicketShiftLab",
  "LaptopUpgradeLab",
  "RamInstallLab",
] as const;

export type LabHostComponent = (typeof LAB_HOST_COMPONENTS)[number];
