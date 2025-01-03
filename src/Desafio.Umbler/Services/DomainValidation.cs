using System;
using FluentValidation;
using Desafio.Umbler.Models;

namespace Desafio.Umbler.Validator
{
    public class DomainValidator : AbstractValidator<string>
    {
        public DomainValidator()
        {
            RuleFor(domainName => domainName)
            .MaximumLength(30).WithMessage("O domínio deve conter no máximo 30 caracteres");
            RuleFor(domainName => domainName)
            .MinimumLength(6).WithMessage("O domínio deve conter no mínimo 6 caracteres");
            RuleFor(domainName => domainName)
            .Matches(@"^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?!-)[A-Za-z0-9-]{2,63}(?<!-)$")
            .WithMessage("Formato de domínio Inválido ou domínio ausente");
        }
    }
}