/**
 * threesw.js - Switch visual de 3 estados estilo candlestick
 * Versión: 1.0.0
 * Autor: Aristides López de León <dracodig@gmail.com>
 * Licencia: MIT
 *
 * Permiso concedido, de forma gratuita, a cualquier persona que obtenga una copia de este software
 * y archivos de documentación asociados (el "Software"), para utilizar el Software sin restricción,
 * incluyendo, sin limitación, los derechos a usar, copiar, modificar, fusionar, publicar, distribuir,
 * sublicenciar y/o vender copias del Software.
 *
 * El Software se proporciona "tal cual", sin garantía de ningún tipo, expresa o implícita,
 * incluyendo pero no limitado a garantías de comerciabilidad o adecuación para un propósito particular.
 */

class threesw {
    constructor(container) {
        this.container = container;
        this.options = container.querySelectorAll('.threesw-option');
        this.input = container.querySelector('input[type="hidden"]');
        this.label = container.querySelector('.threesw-label');

        this._bindEvents();
    }

    _bindEvents() {
        this.options.forEach(option => {
            option.addEventListener('click', () => {
                const state = option.dataset.state;
                if (option.classList.contains('active')) return;

                this.container.classList.remove('state-0', 'state-1', 'state-2');
                this.container.classList.add('state-' + state);

                this.options.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');

                if (this.input) this.input.value = state-1;
                if (this.label) {
                    const labels = ["KO", "Neutro", "OK"];
                    this.label.textContent = `${state} (${labels[state]})`;
                }
            });
        });
    }

    getValue() {
        return this.input ? this.input.value : null;
    }

    setValue(state) {
        const target = Array.from(this.options).find(opt => opt.dataset.state == state);
        if (target) target.click();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.threesw').forEach(el => new threesw(el));
});