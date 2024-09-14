using AutoMapper;
using ECommerce.Dtos;
using ECommerce.Infrastructure.Data.Interfaces;
using ECommerce.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IBasketRepository _basketRepository;
        public BasketController(IBasketRepository basketRepository,IMapper mapper)
        {
            _basketRepository = basketRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<CustomerCart>> GetBasketById(string id)
        {
            var basket =await _basketRepository.GetBasketAsync(id);
            return Ok(basket);
        }
        [HttpPost]
        public async Task<ActionResult<CustomerCart>> UpdateBasket(CustomerCart basket)
        {
         //   var customerBasket = _mapper.Map<CustomerCartDto, CustomerCart>(basket);
            var updatedBasket = await _basketRepository.UpdateBasketAsync(basket);
            return Ok(updatedBasket);
        }

        [HttpDelete]
        public async Task DeleteBasketAsync(string id)
        {
            await _basketRepository.DeleteBasketAsync(id);
        }
    }
}
