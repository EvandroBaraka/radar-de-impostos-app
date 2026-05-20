interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

export const Button = ({ children, variant= 'primary', size = 'md', onClick }: ButtonProps) => {

    const buttonStyles = {
        base: 'flex justify-center items-center gap-2 text-nowrap leading-none hover:cursor-pointer transition-colors duration-200 font-medium rounded-xl transition py-3',
        variant: {
            primary: 'bg-white text-black hover:bg-gray-300',
            secondary: 'bg-transparent border border-white text-white hover:bg-white hover:text-black',
        },
        size: {
            sm: 'px-5',
            md: 'px-8',
            lg: 'px-10',
        }
    }

    const className = `${buttonStyles.base} ${buttonStyles.variant[variant]} ${buttonStyles.size[size]} `

    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    )
}