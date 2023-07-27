export default () => 
<fieldset>
  <legend>Ceremony Date Day:</legend>
  <span id="mdHint">For example: 19 January 2000</span>
  <div class="event-date">
    <div class="form-group form-group--day">
      <label for="date-day">Day:</label>
      <input aria-describedby="mdHint" id="date-day" name="date-day"
        maxlength="2" pattern="[0-9]*" inputmode="numeric" value="" 
        //{% if disabled_state == 'disabled' %} disabled
        //{% elseif disabled_state == 'aria-disabled' %} aria-disabled="true" {%- endif %}
      />
    </div>
    <div class="form-group form-group--month form-group--select">
      <label for="date-month">Month:</label>
      <select id="date-month" name="date-month" aria-describedby="mdHint"
        //{% if disabled_state == 'disabled' %} disabled
        //{% elseif disabled_state == 'aria-disabled' %} aria-disabled="true" {%- endif %}
      >
        <option value>- Select -</option>
        <option value="1">01 - January</option>
        <option value="2">02 - February</option>
        <option value="3">03 - March</option>
        <option value="4">04 - April</option>
        <option value="5">05 - May</option>
        <option value="6">06 - June</option>
        <option value="7">07 - July</option>
        <option value="8">08 - August</option>
        <option value="9">09 - September</option>
        <option value="10">10 - October</option>
        <option value="11">11 - November</option>
        <option value="12">12 - December</option>
      </select>
    </div>
    <div class="form-group form-group--year">
      <label for="date-year">Year:</label>
      <input aria-describedby="mdHint" id="date-year" name="date-year"
        minlength="4" maxlength="4" pattern="[0-9]*" inputmode="numeric" value="" 
        //{% if disabled_state == 'disabled' %} disabled
        //{% elseif disabled_state == 'aria-disabled' %} aria-disabled="true" {%- endif %}
      />
    </div>
  </div>
</fieldset>
