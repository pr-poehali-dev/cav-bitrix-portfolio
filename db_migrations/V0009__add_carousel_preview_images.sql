-- Add carousel and preview image fields to portfolio_projects
ALTER TABLE t_p26695620_cav_bitrix_portfolio.portfolio_projects 
  ADD COLUMN carousel_image_url TEXT,
  ADD COLUMN preview_image_url TEXT;

-- Update existing projects to use image_url as carousel_image_url
UPDATE t_p26695620_cav_bitrix_portfolio.portfolio_projects 
SET carousel_image_url = image_url 
WHERE image_url IS NOT NULL;