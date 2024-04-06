import "./IconButton.css";

export interface IconButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    onClick,
    disabled = false,
    label,
}: IconButtonProps) => {
    return (
        <div
            className="icon-button-container"
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label={label}
        >
            <div className="icon-button-icon">{icon}</div>
            <div className="icon-button-label">{label}</div>
        </div>
    );
};
