import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', 'class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		maxWidth: {
  			'200': '12.6875rem',
  			'219': '13.6875rem',
  			'266': '16.625rem',
  			'277': '17.3125rem',
  			'310': '19.375rem',
  			'334': '20.875rem',
  			'356': '22.25rem',
  			'408': '25.5rem',
  			'420': '26.25rem',
  			'446': '27.875rem',
  			'473': '29.5625rem',
  			'550': '34.375rem',
  			'585': '36.5625rem',
  			'634': '39.625rem',
  			'672': '42rem',
  			'720': '45rem',
  			'1200': '75rem'
  		},
  		height: {
  			'583': '36.4375rem',
  			'650': '40.625rem'
  		},
  		width: {
  			'183': '11.4375rem',
  			'526': '32.875rem',
  			'770': '48.125rem',
  			'1/2': '30%',
  			'1/4': '37%',
  			'2/3': '63%',
  			'2/2': '60%'
  		},
  		gap: {
  			'13': '3.125rem',
  			'30': '1.875rem'
  		},
  		boxShadow: {
  			'light-shadwo': '0px 4px 17px 0px #0000000F',
  			'plan-shadwo': '0 0rem 1.875rem rgba(24, 23, 23, 0.1)',
  			'portfolio-box': '0px 20px 80px 0px rgba(104, 117, 141, 0.15)',
  			darkmd: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
  		},
  		borderRadius: {
  			'14': '0.875rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		transitionProperty: {
  			'max-height': 'max-height',
  			opacity: 'opacity',
  			transform: 'transform',
  			width: 'width',
  			all: 'all'
  		},
  		transitionDuration: {
  			'0': '0ms',
  			'2000': '2000ms',
  			'0.4s': '0.4s'
  		},
  		transitionTimingFunction: {
  			'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1);',
  			'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)'
  		},
  		transform: {
  			'-translate-y-4': '-translate-y-1rem'
  		},
  		zIndex: {
  			'1': '1',
  			'3': '3'
  		},
  		colors: {
  			// Original project colors (restored)
  			primary: '#1358d8',
  			darkprimary: '#054ac8',
  			lightPrimary: '#3187F4',
  			secondary: '#13c296',
  			SlateBlue: '#547593',
  			AliceBlue: '#F3F9FD',
  			LightApricot: '#F9C78F',
  			border: '#233d55',
  			BorderLine: '#CCD7E1',
  			darkmode: '#021526',
  			darklight: '#061B2E',
  			darktext: '#7F8487',
  			dark_border: '#224767',
  			Cream: '#EEE8A9',
  			LavenderBlue: '#DBE7FF',
  			LightSoftBlue: '#DBE9F6',
  			gray: '#ACBCCA',

  			// Shadcn/ui colors (prefixed to avoid conflicts)
  			'shadcn-background': 'hsl(var(--background))',
  			'shadcn-foreground': 'hsl(var(--foreground))',
  			'shadcn-primary': {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'shadcn-secondary': {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			'shadcn-border': 'hsl(var(--border))',
  			'shadcn-input': 'hsl(var(--input))',
  			'shadcn-ring': 'hsl(var(--ring))',
  			'shadcn-card': {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			'shadcn-popover': {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			'shadcn-muted': {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			'shadcn-accent': {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			'shadcn-destructive': {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			'shadcn-chart': {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
