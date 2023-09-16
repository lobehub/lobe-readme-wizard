export interface ShieldsBaseOptions {
  color?: string;
  label?: string;
  labelColor?: string;
  link?: string;
  logo?: string;
  logoColor?: string;
  style: 'flat' | 'flat-square' | 'plastic' | 'for-the-badge' | 'social' | string;
}

export interface GithubShieldBaseOptions {
  branch?: string;
  owner: string;
  repo: string;
}

export interface NpmShieldBaseOptions {
  packageName: string;
}
