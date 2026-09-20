import { AlertTriangle, X } from "lucide-react";

export const ConfirmModal = ({ isOpen, onClose, onConfirm, missionName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Contenedor del Modal */}
      <div className="bg-white dark:bg-space-panel border border-red-500/30 rounded-xl max-w-md w-full p-6 shadow-2xl shadow-red-900/20 transform transition-all">
        {/* Cabecera */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle
                className="text-jpl-red dark:text-red-400"
                size={24}
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wide">
              Autorización Requerida
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cuerpo del mensaje */}
        <p className="text-gray-600 dark:text-gray-300 font-mono text-sm mb-6 leading-relaxed">
          ¿Estás seguro de que deseas purgar los registros de la misión{" "}
          <span className="text-jpl-red dark:text-red-400 font-bold">
            "{missionName}"
          </span>
          ? Esta acción eliminará los datos de los servidores y es irreversible.
        </p>

        {/* Botones de acción */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors font-mono uppercase tracking-wider"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-bold text-white bg-jpl-red hover:bg-red-700 rounded-lg transition-colors font-mono uppercase tracking-wider shadow-lg shadow-red-500/30"
          >
            Purgar Misión
          </button>
        </div>
      </div>
    </div>
  );
};
